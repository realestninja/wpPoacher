const { fetchData } = require("./src/apiCalls");
const { processData } = require("./src/processData");
const { saveContent } = require("./src/fileHandler");

const main = async () => {
  const rawContent = await fetchData();
  const content = processData(rawContent);

  saveContent(content);
};

main();
