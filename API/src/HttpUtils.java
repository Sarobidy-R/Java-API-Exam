import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.util.List;

public class HttpUtils {

    // Gestion CORS
    public static boolean handleCors(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);
        if ("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return true;
        }
        return false;
    }

    public static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    // Méthodes de réponse
    public static void sendResponse(HttpExchange exchange, int statusCode, String response, String contentType)
            throws IOException {
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        exchange.getResponseBody().write(response.getBytes());
        exchange.close();
    }

    public static void sendJsonResponse(HttpExchange exchange, int statusCode, String jsonResponse)
            throws IOException {
        sendResponse(exchange, statusCode, jsonResponse, "application/json");
    }

    public static void sendErrorResponse(HttpExchange exchange, int statusCode, String errorMessage)
            throws IOException {
        sendResponse(exchange, statusCode, errorMessage, "text/plain; charset=UTF-8");
    }

    // Sérialisation
    public static String serializeTicketList(List<Ticket> tickets) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < tickets.size(); i++) {
            sb.append(tickets.get(i).toJson());
            if (i < tickets.size() - 1)
                sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }
}
