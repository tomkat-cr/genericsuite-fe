
export const mediaSupported = () => {
    let mediaSupported = [];
    if (MediaRecorder.isTypeSupported('audio/mpeg')) {
        mediaSupported.push("mp3");
    }
    if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
        mediaSupported.push("opus");
    }
    if (MediaRecorder.isTypeSupported('audio/webm')) {
        mediaSupported.push("webm");
    }
    if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mediaSupported.push("mp4");
    }
    if (MediaRecorder.isTypeSupported('audio/wav')) {
        mediaSupported.push("wav");
    }
    return mediaSupported;
}

export const getMediaTypeToRecord = () => {
    let options = {};
    let extension = null;

    // Check for MP3 support (less likely to be supported)
    if (MediaRecorder.isTypeSupported('audio/mpeg')) {
        options = { mimeType: 'audio/mpeg' };
        extension = "mp3";
    }
    // else if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
    //     // Browser supports recording in Opus format within a WebM container
    //     // (apparently not suported by OpenAi Whisper)
    //     extension = "opus";
    // }
    else if (MediaRecorder.isTypeSupported('audio/webm')) {
        // Browser supports recording in WebM format
        extension = "webm";
    }
    // Check for MP4 support, e.g. iPhones (less likely to be supported)
    else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options = { mimeType: 'audio/mp4' };
        extension = "mp4";
    }
    // Alternatively, Check if the browser supports recording in WAV format
    else if (MediaRecorder.isTypeSupported('audio/wav')) {
        options = { mimeType: 'audio/wav' };
        extension = "wav";
    }
    else {
        // Browser does not support either format, use default settings
        // OpenAi Whisper supports:
        // ['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm']
        throw new Error('No audio extension supported');
    }
    return {
        extension: extension,
        options: options,
    };
}