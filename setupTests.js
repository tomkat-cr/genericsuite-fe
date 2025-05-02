// setupTests.js

// To fix the error: "ReferenceError: TextEncoder is not defined" running jest testing and react-router-dom@7
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;