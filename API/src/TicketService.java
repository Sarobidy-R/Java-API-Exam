import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service de gestion des tickets
 * Responsable de la création, du changement de statut et de la recherche de tickets
 */
public class TicketService {
    private final QueueService<Ticket> waitingQueue = new QueueService<>();
    private final List<Ticket> calledTickets = new ArrayList<>();
    private final List<Ticket> servedTickets = new ArrayList<>();
    private final AtomicInteger ticketCounter = new AtomicInteger(0);

    // ===== GESTION DES TICKETS =====
    
    /**
     * Crée un nouveau ticket et l'ajoute à la file d'attente
     * @return Le ticket créé
     */
    public Ticket createTicket() {
        int ticketNumber = ticketCounter.incrementAndGet();
        Ticket ticket = new Ticket(ticketNumber);
        waitingQueue.enqueue(ticket);
        return ticket;
    }

    /**
     * Retourne la liste des tickets en attente
     * @return Liste des tickets en attente (copie défensive)
     */
    public List<Ticket> getWaitingTickets() {
        return waitingQueue.getAll();
    }

    /**
     * Retourne la liste des tickets appelés
     * @return Liste des tickets appelés (copie défensive)
     */
    public List<Ticket> getCalledTickets() {
        return new ArrayList<>(calledTickets);
    }

    /**
     * Retourne la liste des tickets servis
     * @return Liste des tickets servis (copie défensive)
     */
    public List<Ticket> getServedTickets() {
        return new ArrayList<>(servedTickets);
    }

    /**
     * Retourne tous les tickets (en attente, appelés et servis)
     * @return Liste de tous les tickets
     */
    public List<Ticket> getAllTickets() {
        List<Ticket> allTickets = new ArrayList<>();
        allTickets.addAll(waitingQueue.getAll());
        allTickets.addAll(calledTickets);
        allTickets.addAll(servedTickets);
        return allTickets;
    }

    /**
     * Appelle le prochain ticket en attente (FIFO - First In, First Out)
     * @return Le ticket appelé ou null si aucun ticket en attente
     */
    public Ticket callTicket() {
        if (!waitingQueue.isEmpty()) {
            Ticket ticket = waitingQueue.dequeue();
            ticket.setStatus(Ticket.TicketStatus.CALLED);
            calledTickets.add(ticket);
            return ticket;
        }
        return null;
    }

    /**
     * Sert le premier ticket appelé (FIFO - First In, First Out)
     * @return Le ticket servi ou null si aucun ticket appelé
     */
    public Ticket serveTicket() {
        if (!calledTickets.isEmpty()) {
            Ticket ticket = calledTickets.remove(0); // Premier ticket appelé
            ticket.setStatus(Ticket.TicketStatus.SERVED);
            servedTickets.add(ticket);
            return ticket;
        }
        return null;
    }

    // ===== OPERATIONS SUR LA FILE =====
    
    /**
     * Ajoute un ticket à la file d'attente
     * @param ticket Le ticket à ajouter
     */
    public void enqueue(Ticket ticket) {
        waitingQueue.enqueue(ticket);
    }

    /**
     * Retire et retourne le ticket en tête de la file
     * @return Le ticket en tête de la file
     * @throws IllegalStateException si la file est vide
     */
    public Ticket dequeue() {
        return waitingQueue.dequeue();
    }

    /**
     * Retourne le ticket en tête de la file sans le retirer
     * @return Le ticket en tête de la file
     * @throws IllegalStateException si la file est vide
     */
    public Ticket peek() {
        return waitingQueue.peek();
    }

    /**
     * Vérifie si la file d'attente est vide
     * @return true si la file est vide, false sinon
     */
    public boolean isEmpty() {
        return waitingQueue.isEmpty();
    }

    /**
     * Retourne le nombre de tickets dans la file d'attente
     * @return Le nombre de tickets en attente
     */
    public int size() {
        return waitingQueue.size();
    }
}
