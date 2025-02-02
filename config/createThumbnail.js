const path = require("path")
const outputPath = path.join(__dirname, "..", "images")
const { exec } = require("child_process")

const createThumbnail = (videoUrl, fileName) => {
    try {
        const command = `ffmpeg -i "${videoUrl}" -vf "select='eq(n\,1)'" -fps_mode vfr ${outputPath}/${fileName}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log("Error:", error);
            } else if (stderr) {
                console.log("stderr:", "image yaratib olindi !");
            } else {
                console.log("stdout:", "image yaratildi warn bilan");
            }
        });
    } catch (error) {
        console.log(error)
    }
}

// createThumbnail("https://instagram.ftas1-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQP4GjZGk-VkXRP45CZCwPjNrV5XuNF5GTVb1sHaUvBqfoIOpvXsbf2CgUTXX6wdApeRwXhD9miwWZRBWPNdngqy6uHSKtcf-AiK4cwVH3oU.mp4?strext=1&_nc_cat=109&_nc_sid=9ca052&_nc_ht=instagram.ftas1-1.fna.fbcdn.net&_nc_ohc=MtqELPD_fQAQ7kNvgHbbWKl&efg=eyJ2ZW5jb2RlX3RhZyI6ImlnLXhwdmRzLmNsaXBzLmMyLUMzLmRhc2hfcjJldmV2cDktcjFnZW4ydnA5X3EzMCIsInZpZGVvX2lkIjpudWxsLCJjbGllbnRfbmFtZSI6ImlnIiwib2lsX3VybGdlbl9hcHBfaWQiOjkzNjYxOTc0MzM5MjQ1OSwidXJsZ2VuX3NvdXJjZSI6Ind3dyJ9&ccb=9-4&oh=00_AYDgwe0FFNeisNAP8Z5ma7TaX5j1tmCEjc8sAWdCVLlFLg&oe=678FF952", "123445567.png")

module.exports = {
    generateThumbnail: createThumbnail
}