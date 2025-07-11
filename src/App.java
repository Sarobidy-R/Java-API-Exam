import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class App {
    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        TicketService ticketService = new TicketService();
        TicketQueue ticketQueue = new TicketQueue();

        // Endpoint principal
        server.createContext("/", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            String response = "Holla depuis le serveur Java API ! 🚀";
            exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();
        });

        // Endpoint pour servir le fichier swagger.yaml
        server.createContext("/swagger.yaml", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            try {
                byte[] content = Files.readAllBytes(Paths.get("swagger.yaml"));
                exchange.getResponseHeaders().set("Content-Type", "application/yaml");
                exchange.sendResponseHeaders(200, content.length);
                exchange.getResponseBody().write(content);
            } catch (IOException e) {
                String errorMsg = "Erreur lors de la lecture du fichier swagger.yaml";
                exchange.sendResponseHeaders(500, errorMsg.length());
                exchange.getResponseBody().write(errorMsg.getBytes());
            }
            exchange.close();
        });

        // Endpoint pour Swagger UI
        server.createContext("/swagger", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            String swaggerUI = generateSwaggerUI();
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.sendResponseHeaders(200, swaggerUI.getBytes().length);
            exchange.getResponseBody().write(swaggerUI.getBytes());
            exchange.close();
        });

        // Endpoint de santé
        server.createContext("/api/health", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            String healthResponse = "{\"status\":\"healthy\",\"timestamp\":\"" +
                    java.time.Instant.now().toString() + "\"}";
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, healthResponse.getBytes().length);
            exchange.getResponseBody().write(healthResponse.getBytes());
            exchange.close();
        });

        // Endpoint pour créer un ticket
        server.createContext("/api/tickets", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("POST".equals(exchange.getRequestMethod())) {
                Ticket ticket = ticketService.createTicket();
                String response = ticket.toJson();
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(201, response.getBytes().length);
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            } else if ("GET".equals(exchange.getRequestMethod())) {
                List<Ticket> tickets = ticketService.getAllTickets();
                StringBuilder sb = new StringBuilder();
                sb.append("[");
                for (int i = 0; i < tickets.size(); i++) {
                    sb.append(tickets.get(i).toJson());
                    if (i < tickets.size() - 1) sb.append(",");
                }
                sb.append("]");
                String response = sb.toString();
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.getBytes().length);
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        // Endpoint pour appeler un ticket
        server.createContext("/api/tickets/call", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("POST".equals(exchange.getRequestMethod())) {
                String query = new String(exchange.getRequestBody().readAllBytes());
                int ticketNumber = Integer.parseInt(query.trim());
                boolean called = ticketService.callTicket(ticketNumber);
                String response = called ? "Ticket appelé" : "Ticket non trouvé ou déjà appelé";
                exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
                exchange.sendResponseHeaders(called ? 200 : 404, response.getBytes().length);
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        // Endpoint pour servir un ticket
        server.createContext("/api/tickets/serve", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("POST".equals(exchange.getRequestMethod())) {
                String query = new String(exchange.getRequestBody().readAllBytes());
                int ticketNumber = Integer.parseInt(query.trim());
                boolean served = ticketService.serveTicket(ticketNumber);
                String response = served ? "Ticket servi" : "Ticket non trouvé ou non appelé";
                exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
                exchange.sendResponseHeaders(served ? 200 : 404, response.getBytes().length);
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        // Endpoint pour ajouter un ticket à la file
        server.createContext("/api/queue/enqueue", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("POST".equals(exchange.getRequestMethod())) {
                Ticket ticket = ticketService.createTicket();
                ticketQueue.enqueue(ticket);
                String response = ticket.toJson();
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(201, response.getBytes().length);
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        // Endpoint pour retirer le ticket en tête de la file
        server.createContext("/api/queue/dequeue", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("POST".equals(exchange.getRequestMethod())) {
                try {
                    Ticket ticket = ticketQueue.dequeue();
                    String response = ticket.toJson();
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, response.getBytes().length);
                    exchange.getResponseBody().write(response.getBytes());
                } catch (Exception e) {
                    String response = e.getMessage();
                    exchange.sendResponseHeaders(400, response.getBytes().length);
                    exchange.getResponseBody().write(response.getBytes());
                }
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        // Endpoint pour voir le ticket en tête de la file
        server.createContext("/api/queue/peek", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("GET".equals(exchange.getRequestMethod())) {
                try {
                    Ticket ticket = ticketQueue.peek();
                    String response = ticket.toJson();
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, response.getBytes().length);
                    exchange.getResponseBody().write(response.getBytes());
                } catch (Exception e) {
                    String response = e.getMessage();
                    exchange.sendResponseHeaders(400, response.getBytes().length);
                    exchange.getResponseBody().write(response.getBytes());
                }
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        // Endpoint pour vérifier si la file est vide
        server.createContext("/api/queue/isEmpty", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("GET".equals(exchange.getRequestMethod())) {
                boolean empty = ticketQueue.isEmpty();
                String response = empty ? "true" : "false";
                exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
                exchange.sendResponseHeaders(200, response.getBytes().length);
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        // Endpoint pour la taille de la file
        server.createContext("/api/queue/size", exchange -> {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            addCorsHeaders(exchange);
            if ("GET".equals(exchange.getRequestMethod())) {
                int size = ticketQueue.size();
                String response = String.valueOf(size);
                exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
                exchange.sendResponseHeaders(200, response.getBytes().length);
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
            }
        });

        server.setExecutor(null);
        System.out.println("✅ Serveur HTTP démarré sur le port " + port + " 🎉");
        System.out.println("🌐 Accédez à l'API via http://localhost:" + port);
        System.out.println("📖 Documentation Swagger disponible sur http://localhost:" + port + "/swagger");
        server.start();
    }
    // Ajoute les en-têtes CORS pour permettre les requêtes cross-origin
    public static void addCorsHeaders(com.sun.net.httpserver.HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
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
                        html {
                            box-sizing: border-box;
                            overflow: -moz-scrollbars-vertical;
                            overflow-y: scroll;
                        }
                        *, *:before, *:after {
                            box-sizing: inherit;
                        }
                        body {
                            margin:0;
                            background: #fafafa;
                        }
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