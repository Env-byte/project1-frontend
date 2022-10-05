interface TeamPublicBadgeProps {
    isPublic: boolean
}

const TeamPublicBadge = (props: TeamPublicBadgeProps) => {
    return <span className={"badge badge-pill " + (props.isPublic  ? "bg-success" : "bg-danger") + " badge-primary"}>
        {props.isPublic ? 'Public' : 'Private'}
        </span>
}

export default TeamPublicBadge;