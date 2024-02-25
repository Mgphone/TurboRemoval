import servicesprovided from "../data/servicesprovided";
import manandvanlocation from "../data/manvandatatest";
// const restrictHomeId = servicesprovided.map((item) =>
//   item.Title.replace(/ /g, "-")
// );
const titleReplace = servicesprovided.map((item) =>
  item.Title.replace(/ /g, "-").toLowerCase()
);
const postals = manandvanlocation.map((item) =>
  item.replace(/ /g, "-").toLowerCase()
);

const restrictHomeId = titleReplace.map((title) => {
  return postals.map((postal) => `${title}-${postal}`);
});
// this is for future thinking
// const restrictHomeId = titleReplace.map((title) => {
//   let checkerArray = [];
//   // return postals.map((postal) => `${title}-${postal}`);
//   checkerArray.push(...postals.map((postal) => `${title}-${postal}`));
//   checkerArray.push(...postals.map((postal) => `${postal}-${title}`));
//   return checkerArray;
// });

// const restrictHomeId = manandvanlocation.map((item) => item.replace(/ /g, "-"));
export default restrictHomeId;
