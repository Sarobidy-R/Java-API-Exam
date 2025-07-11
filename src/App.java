import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Endpoint principal
        server.createContext("/", exchange -> {
            String response = "Holla depuis le serveur Java API ! 🚀";
            exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();
        });

        // Endpoint pour servir le fichier swagger.yaml
        server.createContext("/swagger.yaml", exchange -> {
            try {
                byte[] content = Files.readAllBytes(Paths.get("swagger.yaml"));
                exchange.getResponseHeaders().set("Content-Type", "application/yaml");
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
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
            String swaggerUI = generateSwaggerUI();
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.sendResponseHeaders(200, swaggerUI.getBytes().length);
            exchange.getResponseBody().write(swaggerUI.getBytes());
            exchange.close();
        });

        // Endpoint de santé
        server.createContext("/api/health", exchange -> {
            String healthResponse = "{\"status\":\"healthy\",\"timestamp\":\"" +
                    java.time.Instant.now().toString() + "\"}";
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, healthResponse.getBytes().length);
            exchange.getResponseBody().write(healthResponse.getBytes());
            exchange.close();
        });

        server.setExecutor(null);
        System.out.println("✅ Serveur HTTP démarré sur le port " + port + " 🎉");
        System.out.println("🌐 Accédez à l'API via http://localhost:" + port);
        System.out.println("📖 Documentation Swagger disponible sur http://localhost:" + port + "/swagger");
        server.start();
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