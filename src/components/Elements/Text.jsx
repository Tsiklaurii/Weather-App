export const Text = ({ type = "small_card", children }) => {
    return (
        <p className={`${type}_text`}>
            {children}
        </p>
    )
}