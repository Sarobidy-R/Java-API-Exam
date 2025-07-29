import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.util.List;

public class TicketHandler {
    private final TicketService ticketService;

    public TicketHandler(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    public void handleTickets(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        String method = exchange.getRequestMethod();
        try {
            if ("POST".equals(method)) {
                Ticket ticket = ticketService.createTicket();
                HttpUtils.sendJsonResponse(exchange, 201, ticket.toJson());
            } else if ("GET".equals(method)) {
                List<Ticket> tickets = ticketService.getWaitingTickets();
                HttpUtils.sendJsonResponse(exchange, 200, HttpUtils.serializeTicketList(tickets));
            } else {
                HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            }
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handleCallTicket(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket calledTicket = ticketService.callTicket();

            if (calledTicket != null) {
                HttpUtils.sendJsonResponse(exchange, 200, calledTicket.toJson());
            } else {
                HttpUtils.sendResponse(exchange, 404, "Aucun ticket en attente", "text/plain; charset=UTF-8");
            }
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handleServeTicket(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket servedTicket = ticketService.serveTicket();

            if (servedTicket != null) {
                HttpUtils.sendJsonResponse(exchange, 200, servedTicket.toJson());
            } else {
                HttpUtils.sendResponse(exchange, 404, "Aucun ticket appelé", "text/plain; charset=UTF-8");
            }
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handleCalledTickets(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            List<Ticket> tickets = ticketService.getCalledTickets();
            HttpUtils.sendJsonResponse(exchange, 200, HttpUtils.serializeTicketList(tickets));
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    public void handleServedTickets(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange)) return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            HttpUtils.sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            List<Ticket> tickets = ticketService.getServedTickets();
            HttpUtils.sendJsonResponse(exchange, 200, HttpUtils.serializeTicketList(tickets));
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }
}
