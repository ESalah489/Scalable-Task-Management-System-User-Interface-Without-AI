import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

const SocketListener = ({ children }) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = io("http://localhost:5000");
        socket.on("taskUpdated", (data) => {
            console.log("Real-time update received:", data);
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        });

        return () => {
            socket.disconnect();
        };
    }, [queryClient]);

    return children;
};

export default SocketListener;