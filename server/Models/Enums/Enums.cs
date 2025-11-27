namespace server.Models
{
    public enum TaskState
    {
        CREATED,
        DONE,
        CANCELLED,
        WIP
    }

    public enum Stack
    {
        FRONTEND,
        BACKEND,
        MOBILE,
        DESIGN,
        ML
    }
}