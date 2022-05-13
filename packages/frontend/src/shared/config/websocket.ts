const websocketConfig = {
    baseUrl: `localhost:${String(import.meta.env.VITE_BACKEND_PORT || 8080)}`,
}

export { websocketConfig }
