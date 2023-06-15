export function Header () {
    return(
        <header style={styles.header}>
            <h1 style={styles.title}>Kanban Board</h1>
            <p style={styles.subtitle}>Built by Stanley99</p>
        </header>
    )
}

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#2c3e50',
        color: '#ffffff',
        width: '100%',
        position: 'fixed',
        top: 0,
    }
} 