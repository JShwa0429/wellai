import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
        ${normalize}
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        word-wrap: break-word;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
    ol,
    ul,
    li {
        list-style: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    img {
        max-width: 100%;
        height: auto;
        border: 0;
    }

    @font-face { 
        font-family: "Noto Sans KR"
        font-style: normal;
        font-weight:100;
        src: url('./fonts/NotoSansKr/NotoSansKR-Thin.woff2') format('woff2');
    }

    @font-face { 
        font-family: "Noto Sans KR"
        font-style: normal;
        font-weight:300;
        src: url('./fonts/NotoSansKr/NotoSansKR-Light.woff2') format('woff2');
    }
    
    @font-face { 
        font-family: "Noto Sans KR"
        font-style: normal;
        font-weight:400;
        src: url('./fonts/NotoSansKr/NotoSansKR-Regular.woff2') format('woff2');
    }

    @font-face { 
        font-family: "Noto Sans KR"
        font-style: normal;
        font-weight:500;
        src: url('./fonts/NotoSansKr/NotoSansKR-Medium.woff2') format('woff2');
    }

    @font-face { 
        font-family: "Noto Sans KR"
        font-style: normal;
        font-weight:700;
        src: url('./fonts/NotoSansKr/NotoSansKR-Bold.woff2') format('woff2');
    }

    @font-face { 
        font-family: "Noto Sans KR"
        font-style: normal;
        font-weight:900;
        src: url('./fonts/NotoSansKr/NotoSansKR-Black.woff2') format('woff2');
    }
`;

export default GlobalStyle;

// 전역으로 관리할 스타일들 여기다 지정
