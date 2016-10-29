package sample;

import javafx.scene.layout.Pane;

import java.util.ArrayList;
import java.util.Random;

/**
 * Created by User on 10/16/2016.
 */
public class GamePane extends Pane {
    private Pane parentPane;
    private BackendTable backendPane;
    private AbsolutePane numbersPane;
    private ArrayList<NumberElement> elements;
    GamePane(Pane parentPane) {
        super();
        this.parentPane = parentPane;
        parentPane.getChildren().add(this);
        this.setSize(parentPane.getMaxWidth(), parentPane.getMaxHeight());
        this.backendPane = new BackendTable(this);
        this.backendPane.pane.toBack();
        this.numbersPane = new AbsolutePane(this);
        this.numbersPane.toFront();
        this.elements = new ArrayList<>();
    }
    private boolean isPositionFree(int i, int j, ArrayList<Position> elementsPos) {
        int index, len = elementsPos.size();
        for (index = 0; index < len; index++) {
            Position pos = elementsPos.get(index);
            if (pos.i == i && pos.j == j) {
                return false;
            }
        }
        return true;
    }
    private ArrayList<Position> getEmptyCells() {
        int i, j, len = 4;
        ArrayList<Position> positions = new ArrayList<>();
        ArrayList<Position> elementsPos = new ArrayList<>();
        this.elements.forEach(numberElement -> elementsPos.add(numberElement.getPosition()));
        for(i = 0; i < len; i++) {
            for (j = 0; j < len; j++) {
                if (this.isPositionFree(i, j, elementsPos)) {
                    positions.add(new Position(i, j));
                }
            }
        }
        return positions;
    }
    private Position getRandomPosition(ArrayList<Position> positions) {
        int size = positions.size();
        Random rand = new Random();
        return positions.get(rand.nextInt(size));
    }
    private Position getFreePosition() {
        return this.getRandomPosition(this.getEmptyCells());
    }
    private void addElement() {
        NumberElement elem = new NumberElement(this.numbersPane, this.getFreePosition(), 2);
        this.elements.add(elem);
    }
    private void setSize(Double width, Double height) {
        this.setMinSize(width, height);
        this.setMaxSize(width, height);
    }
    public void startNewGame() {
        this.elements.forEach(numberElement -> this.numbersPane.removeChild(numberElement.element));
        this.elements.clear();
        this.addElement();
        this.addElement();
    }
    public void show() {
        this.setVisible(true);
        this.toFront();
    }
    public void hide() {
        this.toBack();
        this.setVisible(false);
    }
    private ArrayList<NumberElement> getElementsByJ(int columnNumber) {
        ArrayList<NumberElement> elementsByJ = new ArrayList<>();
        this.elements.forEach(element -> {
            Position pos = element.getPosition();
            if (pos.j == columnNumber) {
                elementsByJ.add(element);
            }
        });
        elementsByJ.sort((o1, o2) -> {
            return o1.getPosition().i - o2.getPosition().i;
        });
        return elementsByJ;
    }
    private void slideDown() {
        ArrayList<NumberElement> elems;
        int i, len = 4;
        for (i = 0; i < len; i++) {
            elems = this.getElementsByJ(i);
            
        }
    }
}
