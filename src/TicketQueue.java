import java.util.LinkedList;
import java.util.Queue;

public class TicketQueue {
    private final Queue<Ticket> queue = new LinkedList<>();

    public void enqueue(Ticket ticket) {
        queue.add(ticket);
    }

    public Ticket dequeue() {
        if (queue.isEmpty()) {
            throw new IllegalStateException("La file est vide.");
        }
        return queue.poll();
    }

    public Ticket peek() {
        if (queue.isEmpty()) {
            throw new IllegalStateException("La file est vide.");
        }
        return queue.peek();
    }

    public boolean isEmpty() {
        return queue.isEmpty();
    }

    public int size() {
        return queue.size();
    }
}
