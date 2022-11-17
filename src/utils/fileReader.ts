export const getFileReaderURL = (file: File, cb: (value: string | ArrayBuffer) => void) => {
    const fileReader = new FileReader();

    fileReader.onload = function (event) {
        if (event?.target?.result) {
            cb(event?.target?.result)
        }
    };

    fileReader.readAsDataURL(file);
}