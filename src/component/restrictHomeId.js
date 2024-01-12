import servicesprovided from "../data/servicesprovided";
const restrictHomeId = servicesprovided.map((item) =>
  item.Title.replace(/ /g, "-")
);

export default restrictHomeId;
