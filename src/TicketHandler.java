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
            String body = new String(exchange.getRequestBody().readAllBytes());
            int ticketNumber = Integer.parseInt(body.trim());
            boolean called = ticketService.callTicket(ticketNumber);

            if (called) {
                HttpUtils.sendResponse(exchange, 200, "Ticket appelé", "text/plain; charset=UTF-8");
            } else {
                HttpUtils.sendResponse(exchange, 404, "Ticket non trouvé ou déjà appelé", "text/plain; charset=UTF-8");
            }
        } catch (NumberFormatException e) {
            HttpUtils.sendErrorResponse(exchange, 400, "Numéro de ticket invalide");
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
            String body = new String(exchange.getRequestBody().readAllBytes());
            int ticketNumber = Integer.parseInt(body.trim());
            boolean served = ticketService.serveTicket(ticketNumber);

            if (served) {
                HttpUtils.sendResponse(exchange, 200, "Ticket servi", "text/plain; charset=UTF-8");
            } else {
                HttpUtils.sendResponse(exchange, 404, "Ticket non trouvé ou non appelé", "text/plain; charset=UTF-8");
            }
        } catch (NumberFormatException e) {
            HttpUtils.sendErrorResponse(exchange, 400, "Numéro de ticket invalide");
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
