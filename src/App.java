import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.List;

public class App {
    private static TicketService ticketService = new TicketService();

    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Endpoints
        server.createContext("/", App::handleRoot);
        server.createContext("/api/tickets", App::handleTickets);
        server.createContext("/api/tickets/call", App::handleCallTicket);
        server.createContext("/api/tickets/serve", App::handleServeTicket);
        server.createContext("/api/tickets/called", App::handleCalledTickets);
        server.createContext("/api/tickets/served", App::handleServedTickets);
        server.createContext("/api/queue/enqueue", App::handleEnqueue);
        server.createContext("/api/queue/dequeue", App::handleDequeue);
        server.createContext("/api/queue/peek", App::handlePeek);
        server.createContext("/api/queue/isEmpty", App::handleIsEmpty);
        server.createContext("/api/queue/size", App::handleSize);
        server.createContext("/swagger.yaml", App::handleSwaggerYaml);
        server.createContext("/swagger", App::handleSwaggerUI);

        server.setExecutor(null);
        System.out.println("✅ Serveur HTTP démarré sur le port " + port + " 🎉");
        System.out.println("🌐 Accédez à l'API via http://localhost:" + port);
        System.out.println("📖 Documentation Swagger disponible sur http://localhost:" + port + "/swagger");
        server.start();
    }

    // ===== HANDLERS =====
    private static void handleRoot(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;
        sendResponse(exchange, 200, "Holla depuis le serveur Java API ! 🚀", "text/plain; charset=UTF-8");
    }

    private static void handleTickets(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        String method = exchange.getRequestMethod();
        try {
            if ("POST".equals(method)) {
                Ticket ticket = ticketService.createTicket();
                sendJsonResponse(exchange, 201, ticket.toJson());
            } else if ("GET".equals(method)) {
                List<Ticket> tickets = ticketService.getWaitingTickets();
                sendJsonResponse(exchange, 200, serializeTicketList(tickets));
            } else {
                sendErrorResponse(exchange, 405, "Method Not Allowed");
            }
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleCallTicket(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            String body = new String(exchange.getRequestBody().readAllBytes());
            int ticketNumber = Integer.parseInt(body.trim());
            boolean called = ticketService.callTicket(ticketNumber);

            if (called) {
                sendResponse(exchange, 200, "Ticket appelé", "text/plain; charset=UTF-8");
            } else {
                sendResponse(exchange, 404, "Ticket non trouvé ou déjà appelé", "text/plain; charset=UTF-8");
            }
        } catch (NumberFormatException e) {
            sendErrorResponse(exchange, 400, "Numéro de ticket invalide");
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleServeTicket(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            String body = new String(exchange.getRequestBody().readAllBytes());
            int ticketNumber = Integer.parseInt(body.trim());
            boolean served = ticketService.serveTicket(ticketNumber);

            if (served) {
                sendResponse(exchange, 200, "Ticket servi", "text/plain; charset=UTF-8");
            } else {
                sendResponse(exchange, 404, "Ticket non trouvé ou non appelé", "text/plain; charset=UTF-8");
            }
        } catch (NumberFormatException e) {
            sendErrorResponse(exchange, 400, "Numéro de ticket invalide");
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleCalledTickets(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            List<Ticket> tickets = ticketService.getCalledTickets();
            sendJsonResponse(exchange, 200, serializeTicketList(tickets));
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleServedTickets(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            List<Ticket> tickets = ticketService.getServedTickets();
            sendJsonResponse(exchange, 200, serializeTicketList(tickets));
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleEnqueue(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket ticket = ticketService.createTicket();
            sendJsonResponse(exchange, 201, ticket.toJson());
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleDequeue(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"POST".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket ticket = ticketService.dequeue();
            sendJsonResponse(exchange, 200, ticket.toJson());
        } catch (IllegalStateException e) {
            sendErrorResponse(exchange, 400, e.getMessage());
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handlePeek(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            Ticket ticket = ticketService.peek();
            sendJsonResponse(exchange, 200, ticket.toJson());
        } catch (IllegalStateException e) {
            sendErrorResponse(exchange, 400, e.getMessage());
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleIsEmpty(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            boolean empty = ticketService.isEmpty();
            sendResponse(exchange, 200, String.valueOf(empty), "text/plain; charset=UTF-8");
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleSize(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        if (!"GET".equals(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        try {
            int size = ticketService.size();
            sendResponse(exchange, 200, String.valueOf(size), "text/plain; charset=UTF-8");
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur interne: " + e.getMessage());
        }
    }

    private static void handleSwaggerYaml(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        try {
            byte[] content = java.nio.file.Files.readAllBytes(java.nio.file.Paths.get("swagger.yaml"));
            exchange.getResponseHeaders().set("Content-Type", "application/yaml");
            exchange.sendResponseHeaders(200, content.length);
            exchange.getResponseBody().write(content);
            exchange.close();
        } catch (IOException e) {
            sendErrorResponse(exchange, 500, "Erreur lors de la lecture du fichier swagger.yaml");
        }
    }

    private static void handleSwaggerUI(HttpExchange exchange) throws IOException {
        if (handleCors(exchange))
            return;

        try {
            String swaggerUI = generateSwaggerUI();
            sendResponse(exchange, 200, swaggerUI, "text/html; charset=UTF-8");
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Erreur lors de la génération de Swagger UI");
        }
    }

    // ===== UTILITAIRES =====
    private static boolean handleCors(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);
        if ("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return true;
        }
        return false;
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, String response, String contentType)
            throws IOException {
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        exchange.getResponseBody().write(response.getBytes());
        exchange.close();
    }

    private static void sendJsonResponse(HttpExchange exchange, int statusCode, String jsonResponse)
            throws IOException {
        sendResponse(exchange, statusCode, jsonResponse, "application/json");
    }

    private static void sendErrorResponse(HttpExchange exchange, int statusCode, String errorMessage)
            throws IOException {
        sendResponse(exchange, statusCode, errorMessage, "text/plain; charset=UTF-8");
    }

    private static String serializeTicketList(List<Ticket> tickets) {
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

    private static String generateSwaggerUI() {
        return """
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>API Documentation - Swagger UI</title>
                    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui.css" />
                    <style>
                        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
                        *, *:before, *:after { box-sizing: inherit; }
                        body { margin:0; background: #fafafa; }
                    </style>
                </head>
                <body>
                    <div id="swagger-ui"></div>
                    <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
                    <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
                    <script>
                        window.onload = function() {
                            const ui = SwaggerUIBundle({
                                url: window.location.origin + '/swagger.yaml',
                                dom_id: '#swagger-ui',
                                deepLinking: true,
                                presets: [
                                    SwaggerUIBundle.presets.apis,
                                    SwaggerUIStandalonePreset
                                ],
                                plugins: [
                                    SwaggerUIBundle.plugins.DownloadUrl
                                ],
                                layout: "StandaloneLayout"
                            });
                        };
                    </script>
                </body>
                </html>
                """;
    }
}