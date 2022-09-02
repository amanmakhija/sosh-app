import "./ads.css"

export default function Ads({ ad }) {
    return (
        <>
            <div className="ad">
                <div className="adWrapper">
                    <div className="imgContainer">
                        <img className="adImg" src={ad.src} alt={ad.desc} title={ad.desc} />
                    </div>
                    <div className="adText">
                        <span>{ad.desc}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
