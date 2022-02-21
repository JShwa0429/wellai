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
        font-family:"Noto Sans KR";
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
        font-family: "Noto Sans KR";
        font-style: normal;
        src: local('./fonts'),
            url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');
    }

`;

export default GlobalStyle;

// 전역으로 관리할 스타일들 여기다 지정
