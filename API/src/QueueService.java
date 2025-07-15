import java.util.ArrayList;
import java.util.List;

/**
 * Service générique de gestion de file d'attente (FIFO - First In, First Out)
 * @param <T> Type des éléments stockés dans la file
 */
public class QueueService<T> {
    private final List<T> items = new ArrayList<>();

    /**
     * Ajoute un élément à la fin de la file d'attente
     * @param item L'élément à ajouter
     */
    public void enqueue(T item) {
        if (item == null) {
            throw new IllegalArgumentException("L'élément ne peut pas être null");
        }
        items.add(item);
    }

    /**
     * Retire et retourne l'élément en tête de la file
     * @return L'élément en tête de la file
     * @throws IllegalStateException si la file est vide
     */
    public T dequeue() {
        if (items.isEmpty()) {
            throw new IllegalStateException("La file est vide");
        }
        return items.remove(0);
    }

    /**
     * Retourne l'élément en tête de la file sans le retirer
     * @return L'élément en tête de la file
     * @throws IllegalStateException si la file est vide
     */
    public T peek() {
        if (items.isEmpty()) {
            throw new IllegalStateException("La file est vide");
        }
        return items.get(0);
    }

    /**
     * Vérifie si la file est vide
     * @return true si la file est vide, false sinon
     */
    public boolean isEmpty() {
        return items.isEmpty();
    }

    /**
     * Retourne le nombre d'éléments dans la file
     * @return Le nombre d'éléments
     */
    public int size() {
        return items.size();
    }

    /**
     * Retourne une copie de tous les éléments de la file
     * @return Liste des éléments (copie défensive)
     */
    public List<T> getAll() {
        return new ArrayList<>(items);
    }

    /**
     * Retire un élément spécifique de la file
     * @param item L'élément à retirer
     * @return true si l'élément a été retiré, false sinon
     */
    public boolean remove(T item) {
        return items.remove(item);
    }

    /**
     * Vérifie si un élément est présent dans la file
     * @param item L'élément à rechercher
     * @return true si l'élément est présent, false sinon
     */
    public boolean contains(T item) {
        return items.contains(item);
    }

    /**
     * Vide complètement la file
     */
    public void clear() {
        items.clear();
    }
}
