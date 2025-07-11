import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;

public class QueueHandler {
    private final TicketService ticketService;

    public QueueHandler(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    public void handleEnqueue(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket ticket = ticketService.createTicket();
            HttpUtils.sendJsonResponse(exchange, 201, ticket.toJson());
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handleDequeue(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket ticket = ticketService.dequeue();
            HttpUtils.sendJsonResponse(exchange, 200, ticket.toJson());
        } catch (IllegalStateException e) {
            HttpUtils.sendErrorResponse(exchange, 400, e.getMessage());
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handlePeek(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket ticket = ticketService.peek();
            HttpUtils.sendJsonResponse(exchange, 200, ticket.toJson());
        } catch (IllegalStateException e) {
            HttpUtils.sendErrorResponse(exchange, 400, e.getMessage());
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handleIsEmpty(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            boolean empty = ticketService.isEmpty();
            HttpUtils.sendResponse(exchange, 200, String.valueOf(empty), "text/plain; charset=UTF-8");
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handleSize(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            int size = ticketService.size();
            HttpUtils.sendResponse(exchange, 200, String.valueOf(size), "text/plain; charset=UTF-8");
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }
}
