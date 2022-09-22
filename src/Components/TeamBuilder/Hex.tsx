
interface HexProps {
    position: number
}

const Hex = (props: HexProps) => {
    return <div className="hex">
        <div className="hex-top"></div>
        <div className="hex-bottom"></div>
    </div>
}

export default Hex;