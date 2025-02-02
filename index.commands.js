console.log('Available Formats:', stdout);

// Formatlarni tahlil qilish
const formatLines = stdout.split('\n');
const matchedFormats = [];
const addedResolutions = new Set();

formatLines.forEach(line => {
    requiredResolutions.forEach(resolution => {
        if (line.includes(resolution)) {
            const formatId = line.split(/\s+/)[0]; // Format ID (birinchi qism)
            if (!addedResolutions.has(resolution)) {
                matchedFormats.push({ formatId, resolution });
                addedResolutions.add(resolution); // Rezolyutsiyani qo'shish
            }
        }
    });
});

if (matchedFormats.length > 0) {
    // Kerakli formatlar uchun URL olish
    const resFormats = {}; // Natijalar obyekt shaklida saqlanadi
    const promises = matchedFormats.map(
        format =>
            new Promise((resolve, reject) => {
                const command = `yt-dlp -f "best" ${format.formatId} --get-url ${videoUrl}`;
                exec(command, (error, res, stderr) => {
                    if (error) {
                        console.error(`Error fetching URL for format ${format.formatId}: ${error.message}`);
                        resolve(); // Xatolikda davom etish
                    } else if (stderr) {
                        console.warn(`Warning for format ${format.formatId}: ${stderr}`);
                        resolve();
                    } else {
                        resFormats[format.resolution] = res.trim(); // Rezolyutsiya uchun URL saqlash
                        resolve();
                    }
                });
            })
    );

    Promise.all(promises).then(() => {
        resolve(resFormats)
    }).catch((err) => {
        reject(err)
    });
} else {
    console.log('No matching formats found for the required resolutions.');
}


exec(listCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.warn(`Warning: ${stderr}`);
    }
    const formats = stdout.split("\n")

    const listOfFormats = formats.map(format => {
        const [code, extension, resolution, note] = format.trim().split(/\s+/); // Bo'sh joy bilan ajratish
        return { code, extension, resolution, note }
    })


    const resolutionsOfVideo = new Set()

    listOfFormats.forEach((format, index) => {
        for (let resolution of requiredResolutions) {
            if (format.resolution == resolution && resolutionsOfVideo.has(format.resolution)) {
                resolutionsOfVideo.add({
                    resolution: format.resolution,
                    formatId: format.code
                })
            }
        }
    })

    resolve(Array(...resolutionsOfVideo))

});

const namesArray = Object.keys(videoUrl)
console.log("names arrray", namesArray)
console.log("vidoeUrls", videoUrl)
if (!videoUrl) {
    return res.status(400).json({
        message: "Url bo'yicha muammolar mavjud !"
    })
}
const fileName = Date.now() + ".png"
generateThumbnail(videoUrl[namesArray[0]], fileName)



const downloadVideo = (videoUrl, formats) => {
    try {
        return new Promise((resolve, reject) => {
            const downloadUrls = []

            console.log("format in video: ", formats)

            formats.forEach(format => {
                console.log("formatId in foreach : ", format.formatId)
                const command = `yt-dlp -f ${format.formatId} --get-url ${videoUrl}`
                exec(command, (error, response, warn) => {
                    if (error) {
                        console.log("videni yuklab olishda muammo yuzaga keldi: ", error)
                        reject(error)
                    } else if (warn) {
                        console.log("javob warn bilan keldi: ", warn)
                    } else {
                        console.log("100% to'g'ri javob: ", response)
                        downloadUrls.push({
                            resolution: format.resolution,
                            code: format.formatId,
                            downloadUrl: response
                        })
                    }
                })
            })

            console.log(downloadUrls, "downloadUrls")

            if (downloadUrls) resolve(downloadUrls)
        })
    } catch (error) {
        console.log("download video error: ", error)
    }
}


if (password.length === 3) {
    if (JSON.stringify(password.concat(value)) === JSON.stringify(correctPassword)) {
        console.log("Password is correct");
        setLockEmail(true)
        setPassword([])
    } else {
        console.log("Incorrect password");
        setPassword([]);
    }
}

else {
    const newGeneratedId = generateId()

    await AsyncStorage.setItem("user_id", newGeneratedId).then(() => {
        console.log("user id changed", newGeneratedId)
    })
}