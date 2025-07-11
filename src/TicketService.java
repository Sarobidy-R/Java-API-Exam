import java.util.ArrayList;
import java.util.List;

public class TicketService {
    private final List<Ticket> tickets = new ArrayList<>();

    public Ticket createTicket() {
        Ticket ticket = new Ticket();
        tickets.add(ticket);
        return ticket;
    }

    public List<Ticket> getAllTickets() {
        return new ArrayList<>(tickets);
    }

    public Ticket getTicketByNumber(int number) {
        return tickets.stream()
                .filter(t -> t.getTicketNumber() == number)
                .findFirst()
                .orElse(null);
    }

    public boolean callTicket(int number) {
        Ticket ticket = getTicketByNumber(number);
        if (ticket != null && ticket.getStatus() == Ticket.TicketStatus.WAITING) {
            ticket.setStatus(Ticket.TicketStatus.CALLED);
            return true;
        }
        return false;
    }

    public boolean serveTicket(int number) {
        Ticket ticket = getTicketByNumber(number);
        if (ticket != null && ticket.getStatus() == Ticket.TicketStatus.CALLED) {
            ticket.setStatus(Ticket.TicketStatus.SERVED);
            return true;
        }
        return false;
    }
}
