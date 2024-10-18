import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import Textbook from "@/models/Textbookmodel";

dotenv.config();

/**
 * Load textbooks into the database.
 * @author Sriram Sundar
 *
 * @async
 * @returns {Promise<void>}
 */
const loadTextbooks = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");

    const textbooksData = [
      {
        title: "⼈体分⼦与细胞 / Human Molecules and Cells",
        author: "OSBC",
        description: "human biology and molecules textbook",
        vectorStorePath: "output.index",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "《外科学》人卫第9版教材--高清彩色",
        author: "OSBC",
        description: "surgery textbook",
        vectorStorePath: "《外科学》人卫第9版教材--高清彩色_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "《生理学》人卫第9版教材--高清彩色",
        author: "OSBC",
        description: "physiology textbook",
        vectorStorePath: "《生理学》人卫第9版教材--高清彩色_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "《病理学》人卫第9版教材--高清彩色",
        author: "OSBC",
        description: "pathalogy textbook",
        vectorStorePath: "《病理学》人卫第9版教材--高清彩色_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "《病理生理学》人卫第9版教材--高清彩色",
        author: "OSBC",
        description: "pathological physiology textbook",
        vectorStorePath: "《病理生理学》人卫第9版教材--高清彩色_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "《诊断学》人卫第9版教材--高清彩色",
        author: "OSBC",
        description: "diagnostics textbook",
        vectorStorePath: "《诊断学》人卫第9版教材--高清彩色_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "第九版内科学(2018)",
        author: "OSBC",
        description: "Ninth edition of Internal Medicine ",
        vectorStorePath: "《第九版内科学（2018）_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "《第九版生物化学与分子生物学（2018）",
        author: "OSBC",
        description:
          " Ninth edition Biochemistry and Molecular Biology textbook",
        vectorStorePath: "第九版生物化学与分子生物学（2018）_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
      {
        title: "第九版生理学（2018）",
        author: "OSBC",
        description: "Ninth edition Physiology",
        vectorStorePath: "第九版生理学（2018）_vector_store",
        textFilePath: "⼈体分⼦与细胞.txt",
      },
    ];

    for (const book of textbooksData) {
      let textbook = await Textbook.findOne({ title: book.title });

      if (!textbook) {
        textbook = new Textbook(book);
      }

      const srcDir = path.resolve(__dirname, "..");

      textbook.vectorStorePath = path.join(
        srcDir,
        "assets",
        "vectors",
        book.vectorStorePath
      );

      textbook.textFilePath = path.join(
        srcDir,
        "assets",
        "textbooks",
        book.textFilePath
      );

      console.log(textbook.vectorStorePath);
      console.log(textbook.textFilePath);

      await textbook.save();
      console.log(`Processed textbook: ${book.title}`);
    }

    console.log("All textbooks processed");
  } catch (error) {
    console.error("Error processing textbooks:", error);
  } finally {
    await mongoose.disconnect();
  }
};

loadTextbooks();
