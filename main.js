const { fetchData } = require("./src/apiCalls");
const { handleContent } = require("./src/contentMediaHandler");

const main = async () => {
  let currentPost = 1;
  while (currentPost > 0) {
    const rawContent = await fetchData(currentPost);
    // const rawContent = await fetchData(1);
    if (!rawContent) {
      currentPost = -1;
    } else {
      handleContent(rawContent);
      currentPost += 1;
      console.log(`${rawContent.title.rendered}: DONE`);
    }
  }
};

main();
