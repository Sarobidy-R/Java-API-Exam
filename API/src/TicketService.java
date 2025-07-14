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
     * Appelle un ticket (change son statut de WAITING à CALLED)
     * @param ticketNumber Le numéro du ticket à appeler
     * @return true si le ticket a été appelé avec succès, false sinon
     */
    public boolean callTicket(int ticketNumber) {
        Ticket ticket = findTicketInQueue(ticketNumber);
        if (ticket != null) {
            ticket.setStatus(Ticket.TicketStatus.CALLED);
            waitingQueue.remove(ticket);
            calledTickets.add(ticket);
            return true;
        }
        return false;
    }

    /**
     * Sert un ticket (change son statut de CALLED à SERVED)
     * @param ticketNumber Le numéro du ticket à servir
     * @return true si le ticket a été servi avec succès, false sinon
     */
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

    // ===== METHODES UTILITAIRES =====
    
    /**
     * Recherche un ticket dans une liste donnée
     * @param list La liste dans laquelle rechercher
     * @param ticketNumber Le numéro du ticket à rechercher
     * @return Le ticket trouvé ou null
     */
    private Ticket findTicket(List<Ticket> list, int ticketNumber) {
        return list.stream()
            .filter(t -> t.getTicketNumber() == ticketNumber)
            .findFirst()
            .orElse(null);
    }

    /**
     * Recherche un ticket dans la file d'attente
     * @param ticketNumber Le numéro du ticket à rechercher
     * @return Le ticket trouvé ou null
     */
    private Ticket findTicketInQueue(int ticketNumber) {
        return waitingQueue.getAll().stream()
            .filter(t -> t.getTicketNumber() == ticketNumber)
            .findFirst()
            .orElse(null);
    }
}
