import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class TicketService {
    private List<Ticket> waitingTickets = new ArrayList<>();
    private List<Ticket> calledTickets = new ArrayList<>();
    private List<Ticket> servedTickets = new ArrayList<>();
    private AtomicInteger ticketCounter = new AtomicInteger(0);

    // ===== GESTION DES TICKETS =====
    public Ticket createTicket() {
        int ticketNumber = ticketCounter.incrementAndGet();
        Ticket ticket = new Ticket(ticketNumber);
        waitingTickets.add(ticket);
        return ticket;
    }

    public List<Ticket> getWaitingTickets() {
        return new ArrayList<>(waitingTickets);
    }

    public List<Ticket> getCalledTickets() {
        return new ArrayList<>(calledTickets);
    }

    public List<Ticket> getServedTickets() {
        return new ArrayList<>(servedTickets);
    }

    public List<Ticket> getAllTickets() {
        List<Ticket> allTickets = new ArrayList<>();
        allTickets.addAll(waitingTickets);
        allTickets.addAll(calledTickets);
        allTickets.addAll(servedTickets);
        return allTickets;
    }

    public boolean callTicket(int ticketNumber) {
        Ticket ticket = findTicket(waitingTickets, ticketNumber);
        if (ticket != null) {
            ticket.setStatus(Ticket.TicketStatus.CALLED);
            waitingTickets.remove(ticket);
            calledTickets.add(ticket);
            return true;
        }
        return false;
    }

    public boolean serveTicket(int ticketNumber) {
        Ticket ticket = findTicket(calledTickets, ticketNumber);
        if (ticket != null) {
            ticket.setStatus(Ticket.TicketStatus.SERVED);
            calledTickets.remove(ticket);
            servedTickets.add(ticket);
            return true;
        }
        return false;
    }

    // ===== OPERATIONS SUR LA FILE =====
    
    // Ajoute un ticket à la file d'attente
    public void enqueue(Ticket ticket) {
        waitingTickets.add(ticket);
    }

    // Retire et retourne le ticket en tête de la file
    public Ticket dequeue() {
        if (waitingTickets.isEmpty()) {
            throw new IllegalStateException("La file est vide.");
        }
        return waitingTickets.remove(0);
    }

    // Retourne le ticket en tête sans le retirer
    public Ticket peek() {
        if (waitingTickets.isEmpty()) {
            throw new IllegalStateException("La file est vide.");
        }
        return waitingTickets.get(0);
    }

    // Vérifie si la file est vide
    public boolean isEmpty() {
        return waitingTickets.isEmpty();
    }

    // Retourne le nombre de tickets dans la file
    public int size() {
        return waitingTickets.size();
    }

    // ===== METHODES UTILITAIRES =====
    private Ticket findTicket(List<Ticket> list, int ticketNumber) {
        return list.stream()
            .filter(t -> t.getTicketNumber() == ticketNumber)
            .findFirst()
            .orElse(null);
    }
}
