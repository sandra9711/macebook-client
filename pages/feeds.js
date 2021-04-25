import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import Router from 'next/router'
import styles from '../styles/pages/feeds.module.scss'

const Feeds = ({feeds}) => {
    return(
        <Layout>
            <SEO title="Feeds | Macebook"/>
            <h1>Feeds</h1>
            {feeds.map((f, idx) => <div key={idx}>{f}</div>)}
        </Layout>
    )
}

Feeds.getInitialProps = async (ctx) => {
    const res = await fetch(`${process.env.API}/api/feeds`, {
        method: 'GET',
        credentials: 'include',
        headers: ctx.req ? {cookie: ctx.req.headers.cookie} : undefined
    })
    
    if(res.status === 401 && !ctx.req){
        Router.replace('/login')
        return {}
    }

    if(res.status === 401 && ctx.req){
        ctx.res.writeHead(301, {Location: '/login'})
        ctx.res.end()
        return {}
    }
    
    return {
        feeds: [
            "feed 1",
            "feed 2",
            "feed 3",
            "feed 4",
        ]
    }
}

export default Feeds