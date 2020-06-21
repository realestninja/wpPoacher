const { fetchData } = require("./src/apiCalls");
const { processData } = require("./src/processData");
const { saveContent } = require("./src/fileHandler");

const main = async () => {
  let currentPost = 1;
  while (currentPost > 0) {
    const rawContent = await fetchData(currentPost);
    if (!rawContent) {
      currentPost = -1;
    } else {
      const content = processData(rawContent);
      saveContent(content);
      console.log(`${content.title.rendered}: DONE`);
      currentPost += 1;
    }
  }
};

main();
