import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import NotoSansKRRegular from './fonts/NotoSansKr/NotoSansKR-Regular.woff2';
import NotoSansKRBold from './fonts/NotoSansKr/NotoSansKR-Bold.woff2';
import NotoSansKRBlack from './fonts/NotoSansKr/NotoSansKR-Black.woff2';
import NotoSansKRThin from './fonts/NotoSansKr/NotoSansKR-Thin.woff2';
import NotoSansKRLight from './fonts/NotoSansKr/NotoSansKR-Light.woff2';

const GlobalStyle = createGlobalStyle`
        ${normalize}
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        word-wrap: break-word;
        font-family:'Noto Sans Kr',  'sans-serif';
        
    }

    ::-webkit-scrollbar {
        display: none;
    }

    @font-face {
        font-size : 12px | 0.8em;
        font-style: normal;
        font-weight:300;
        line-height: 20px | 120%;
    }

    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
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
    a{
        text-decoration:none;
    }
    
   

    @font-face{
        font-family: "Noto Sans Kr" !important;
        font-size: 12px | 0.8em;
        font-style: normal;
        font-weight:400;
        src: local('Noto Sans KR'), url(${NotoSansKRRegular}) format('woff2');
    }

   

    @font-face { 
        font-family: "Noto Sans Kr";
        font-size: 12px | 0.8em;
        font-style: normal;
        font-weight:700;
        src: local('Noto Sans KR'), url(${NotoSansKRBold}) format('woff2');
    }

    @font-face { 
        font-family: "Noto Sans Kr";
        font-size: 12px | 0.8em;
        font-style: normal;
        font-weight:900;
        src: local('Noto Sans KR'), url(${NotoSansKRBlack}) format('woff2');
    }

    @font-face { 
        font-family: "Noto Sans KR Thin";
        font-size: 12px | 0.8em;
        font-style: normal;
        font-weight:100;
        src: local('Noto Sans KR'), url(${NotoSansKRThin}) format('woff2');
    }

    @font-face { 
        font-family: "Noto Sans KR Light";
        font-size: 12px | 0.8em;
        font-style: normal;
        font-weight:300;
        src: local('Noto Sans KR'), url(${NotoSansKRLight}) format('woff2');
    }
`;

export default GlobalStyle;

// 전역으로 관리할 스타일들 여기다 지정
