import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Expression from "./contentComponents/Expression";
import Paragraph from "./contentComponents/Paragraph";
import Heading from "./contentComponents/Heading";
import Image from "./contentComponents/Image";
import Sidebar1 from "../../components/Sidebar1";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const ContentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [topics, setTopics] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { chapter, topic } = useParams();

  useEffect(() => {
    (async () => {
      const contentImportPath = `../../data/content/${chapter}/${chapter}-${topic}.json`;
      const topicImportPath = `../../data/topics/${chapter}-topics.json`;
      const importedData = await import(contentImportPath);
      const importedTopic = await import(topicImportPath);
      setData(importedData.data);
      setTopics(importedTopic.default);
    })();
  }, [chapter, topic]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar title={topics.title} toggle={toggleSidebar} />
      <div className="flex flex-row content-height">
        {/* Chapter sidebar for routing */}
        <Sidebar topic={topics.topic} subtopics={topics.subtopics} />
        {/* chapter sidebar for routing for smaller devices */}
        <Sidebar1
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          topic={topics.topic}
          subtopics={topics.subtopics}
        />
        <div className="w-full px-6 pb-10 overflow-y-scroll">
          {data.map((element) => {
            switch (element.name) {
              case "heading":
                return <Heading key={element.idx} heading={element.body} />;
              case "Paragraph":
                return <Paragraph key={element.idx} text={element.body} />;
              case "description":
                return (
                  <span key={element.idx} className="w-full text-center">
                    {element.body}
                  </span>
                );
              case "image":
                return <Image key={element.idx} info={element} />;
              case "expression":
                return <Expression latex={element.body} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
