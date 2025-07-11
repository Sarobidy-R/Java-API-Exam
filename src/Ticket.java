import java.time.LocalDateTime;

public class Ticket {
    private int ticketNumber;
    private TicketStatus status;
    private LocalDateTime creationDate;
    private LocalDateTime calledDate;
    private LocalDateTime servedDate;
    
    private static int currentTicketNumber = 0;

    public enum TicketStatus {
        WAITING("En attente"),
        CALLED("Appelé"),
        SERVED("Servi");

        private final String description;

        TicketStatus(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    public Ticket() {
        this.ticketNumber = ++currentTicketNumber;
        this.status = TicketStatus.WAITING;
        this.creationDate = LocalDateTime.now();
        this.calledDate = null;
        this.servedDate = null;
    }

    // Getters
    public int getTicketNumber() {
        return ticketNumber;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime getCalledDate() {
        return calledDate;
    }

    public LocalDateTime getServedDate() {
        return servedDate;
    }

    // Setters
    public void setStatus(TicketStatus status) {
        this.status = status;
        if (status == TicketStatus.CALLED) {
            this.calledDate = LocalDateTime.now();
        } else if (status == TicketStatus.SERVED) {
            this.servedDate = LocalDateTime.now();
        }
    }

    @Override
    public String toString() {
        return toJson();
    }

    public String toJson() {
        return String.format(
            "{\"ticketNumber\":%d,\"status\":\"%s\",\"creationDate\":\"%s\",\"calledDate\":%s,\"servedDate\":%s}",
            ticketNumber,
            status,
            creationDate,
            calledDate == null ? "null" : "\"" + calledDate + "\"",
            servedDate == null ? "null" : "\"" + servedDate + "\""
        );
    }
}
