import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.net.InetSocketAddress;

public class App {
    private static TicketService ticketService = new TicketService();
    private static TicketHandler ticketHandler = new TicketHandler(ticketService);
    private static QueueHandler queueHandler = new QueueHandler(ticketService);

    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Endpoints
        server.createContext("/", App::handleRoot);
        server.createContext("/api/tickets", ticketHandler::handleTickets);
        server.createContext("/api/tickets/call", ticketHandler::handleCallTicket);
        server.createContext("/api/tickets/serve", ticketHandler::handleServeTicket);
        server.createContext("/api/tickets/called", ticketHandler::handleCalledTickets);
        server.createContext("/api/tickets/served", ticketHandler::handleServedTickets);
        server.createContext("/api/queue/enqueue", queueHandler::handleEnqueue);
        server.createContext("/api/queue/dequeue", queueHandler::handleDequeue);
        server.createContext("/api/queue/peek", queueHandler::handlePeek);
        server.createContext("/api/queue/isEmpty", queueHandler::handleIsEmpty);
        server.createContext("/api/queue/size", queueHandler::handleSize);
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
        if (HttpUtils.handleCors(exchange))
            return;
        HttpUtils.sendResponse(exchange, 200, "Holla depuis le serveur Java API ! 🚀", "text/plain; charset=UTF-8");
    }

    private static void handleSwaggerYaml(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange))
            return;

        try {
            byte[] content = java.nio.file.Files.readAllBytes(java.nio.file.Paths.get("swagger.yaml"));
            exchange.getResponseHeaders().set("Content-Type", "application/yaml");
            exchange.sendResponseHeaders(200, content.length);
            exchange.getResponseBody().write(content);
            exchange.close();
        } catch (IOException e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur lors de la lecture du fichier swagger.yaml");
        }
    }

    private static void handleSwaggerUI(HttpExchange exchange) throws IOException {
        if (HttpUtils.handleCors(exchange))
            return;

        try {
            String swaggerUI = generateSwaggerUI();
            HttpUtils.sendResponse(exchange, 200, swaggerUI, "text/html; charset=UTF-8");
        } catch (Exception e) {
            HttpUtils.sendErrorResponse(exchange, 500, "Erreur lors de la génération de Swagger UI");
        }
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