import fs from "fs";

const writeToJSON = <T>(data: T, fileName: string): void => {
  const filePath = `./data/${fileName}`;
  let jsonData: T[] = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    jsonData = JSON.parse(fileContent);
  }

  jsonData.push(data);
  console.log("adding data", data);
  fs.writeFileSync(filePath, JSON.stringify(jsonData));
};

export default writeToJSON;
