import { ChangeEvent } from 'react'

import { toastr } from 'react-redux-toastr'

export const changeImageHandler = (
  event: ChangeEvent<HTMLInputElement>,
  cb: (value: string | ArrayBuffer) => void
) => {
  if (event.target.files) {
    const file = event?.target?.files[0]

    const isLarger = checkFileSize(file.size)

    if (isLarger) return

    getFileReaderURL(file, cb)
  }
}

export const getFileReaderURL = (file: File, cb: (value: string | ArrayBuffer) => void) => {
  const fileReader = new FileReader()

  fileReader.onload = function (event) {
    if (event?.target?.result) {
      cb(event?.target?.result)
    }
  }

  fileReader.readAsDataURL(file)
}

export const checkFileSize = (fileSize: number): boolean => {
  if (fileSize > 100000) {
    toastr.error('File size is too large', 'max size 100kb')

    return true
  }

  return false
}
