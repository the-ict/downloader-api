const { exec } = require("child_process");


const getVideoUrlsForFormats = (videoUrl, ip = 10, port = 200) => {
    const requiredResolutions = ['480x854', '720x1280', '1080x1920'];

    const proxy = `--proxy http://${ip}:${port}`;
    const listCommand = `yt-dlp --list-formats ${videoUrl}`;

    return new Promise((resolve, reject) => {
        exec(listCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.warn(`Warning: ${stderr}`);
            }

            const formats = stdout.split("\n");

            const listOfFormats = formats.map(format => {
                const [code, extension, resolution, note] = format.trim().split(/\s+/);
                return { code, extension, resolution, note };
            });

            const resolutionsOfVideo = new Map();

            listOfFormats.forEach(format => {
                if (requiredResolutions.includes(format.resolution)) {
                    if (!resolutionsOfVideo.has(format.resolution)) {
                        resolutionsOfVideo.set(format.resolution, {
                            resolution: format.resolution,
                            formatId: format.code
                        });
                    }
                }
            });

            resolve(Array.from(resolutionsOfVideo.values()));
        });
    });
};


const downloadVideo = (videoUrl, formats) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("Formats in video: ", formats);

            const promises = formats.map(format => {
                return new Promise((res, rej) => {
                    const command = `yt-dlp -f "${format.formatId}+bestaudio" -f "best" --get-url ${videoUrl}`;
                    exec(command, (error, response, warn) => {
                        if (error) {
                            console.error(`Error downloading video: ${error}`);
                            rej(error);
                        } else {
                            console.log(`100% correct response for ${format.formatId}: `, response.trim());
                            res({
                                resolution: format.resolution,
                                code: format.formatId,
                                downloadUrl: response.trim()
                            });
                        }
                    });
                });
            });

            // Resolve all promises at once
            Promise.all(promises)
                .then(results => {
                    console.log("All download URLs: ", results);
                    resolve(results);
                })
                .catch(err => {
                    console.error("Error in one of the formats: ", err);
                    reject(err);
                });
        } catch (error) {
            console.error("Unexpected error: ", error);
            reject(error);
        }
    });
};


// getVideoUrlsForFormats("https://www.instagram.com/reels/DEjw4o3tAeV/").then((formats) => {
//     console.log("formats: ", formats)
//     downloadVideo("https://www.instagram.com/reels/DEjw4o3tAeV/", formats).then(url => {
//         console.log("urls: ", url)
//     })
// })

// test jarayonida muvaffaqiyatli



module.exports = {
    getFormatId: getVideoUrlsForFormats,
    getDownloadUrl: downloadVideo
}