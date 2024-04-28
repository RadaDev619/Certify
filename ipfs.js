const handelSubmit = async (e) => {
    e.preventDefault();
    try {
        const fileData = new FormData();
        fileData.append("file", file);

        const responseData = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: fileData,
            headers: {
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
                "Content-Type": `multipart/form-data`,
            },
        });
        const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash
        console.log(fileUrl);
    } catch (err) {
        console.log(err);
    }
};