import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import ScriptTag from 'react-script-tag';
import { withPrefix } from '../utils';


class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        // see https://github.com/nfl/react-helmet#server-usage for more information
        // 'head' was occupied by 'renderPage().head', we cannot use it
        return { ...initialProps, helmet: Helmet.renderStatic() }
    }

    // should render on <html>
    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent()
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent()
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map((el) => this.props.helmet[el].toComponent())
    }

    render() {
        return (
            <Html {...this.helmetHtmlAttrComponents}>
                <Head>{this.helmetHeadComponents}</Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <ScriptTag src={withPrefix('js/lib/modernizr.js')}/>
                    <ScriptTag src={withPrefix('js/main.js')}/>
                    <ScriptTag src={withPrefix('js/page_load.js')}/>
                    <ScriptTag src={withPrefix('js/page_unload.js')}/>
                                    <script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1188748351555027');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1188748351555027&ev=PageView&noscript=1"
/></noscript>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
