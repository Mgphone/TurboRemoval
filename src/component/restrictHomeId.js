import servicesprovided from "../data/servicesprovided";
import manandvanlocation from "../data/manvandatatest";
// const restrictHomeId = servicesprovided.map((item) =>
//   item.Title.replace(/ /g, "-")
// );
const titleReplace = servicesprovided.map((item) =>
  item.Title.replace(/ /g, "-")
);
const postals = manandvanlocation.map((item) => item.replace(/ /g, "-"));

const restrictHomeId = titleReplace.map((title) => {
  return postals.map((postal) => `${title}-${postal}`);
});

// const restrictHomeId = manandvanlocation.map((item) => item.replace(/ /g, "-"));
export default restrictHomeId;
