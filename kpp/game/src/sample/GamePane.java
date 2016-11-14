package sample;

import javafx.scene.layout.Pane;

import java.awt.event.ActionEvent;
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
    public void moveEvent(String eventName) {
        switch (eventName) {
            case "up": this.slideUp(); this.addElement(); break;
            case "down": this.slideDown(); this.addElement(); break;
            case "left": this.slideLeft(); this.addElement(); break;
            case "right": this.slideRight(); this.addElement(); break;
        }
    }
    private ArrayList<NumberElement> getElementsByJ(int columnNumber) {
        ArrayList<NumberElement> elementsByJ = new ArrayList<>();
        this.elements.forEach(element -> {
            Position pos = element.getPosition();
            if (pos.j == columnNumber) {
                elementsByJ.add(element);
            }
        });
        return elementsByJ;
    }
    private ArrayList<NumberElement> getElementsByI(int rowNumber) {
        ArrayList<NumberElement> elementsByJ = new ArrayList<>();
        this.elements.forEach(element -> {
            Position pos = element.getPosition();
            if (pos.i == rowNumber) {
                elementsByJ.add(element);
            }
        });
        return elementsByJ;
    }
    private void slideDown() {
        ArrayList<NumberElement> elems;
        int i, len = 4;
        for (i = 0; i < len; i++) {
            elems = this.getElementsByJ(i);
            this.findActionDownAndUp(3, elems, -1, -1);
        }
    }
    private void slideUp() {
        ArrayList<NumberElement> elems;
        int i, len = 4;
        for (i = 0; i < len; i++) {
            elems = this.getElementsByJ(i);
            this.findActionDownAndUp(0, elems, 4, 1);
        }
    }
    private void slideLeft() {
        ArrayList<NumberElement> elems;
        int i, len = 4;
        for (i = 0; i < len; i++) {
            elems = this.getElementsByI(i);
            this.findActionLeftAndRight(0, elems, 4, 1);
        }
    }
    private void slideRight() {
        ArrayList<NumberElement> elems;
        int i, len = 4;
        for (i = 0; i < len; i++) {
            elems = this.getElementsByI(i);
            this.findActionLeftAndRight(3, elems, -1, -1);
        }
    }
    private NumberElement getElementWithIndexI(int index, ArrayList<NumberElement> elems) {
        int i, len = elems.size();
        NumberElement elem;

        for (i = 0; i < len; i++) {
            elem = elems.get(i);
            if (elem.getPosition().i == index) {
                return elem;
            }
        }
        return new NumberElement();
    }
    private NumberElement getElementWithIndexJ(int index, ArrayList<NumberElement> elems) {
        int i, len = elems.size();
        NumberElement elem;

        for (i = 0; i < len; i++) {
            elem = elems.get(i);
            if (elem.getPosition().j == index) {
                return elem;
            }
        }
        return new NumberElement();
    }
    private void findActionDownAndUp(int currentIndexI, ArrayList<NumberElement> elems, int minIndex, int increment) {
        NumberElement currElement, nextElement;
        int indexOfNextElement;
        // if current index is last(function on the top element) or if we have empty array of elements -> GET OUT OF HERE
        if (currentIndexI == minIndex || elems.size() == 0) {
            return;
        }
        // get element by current index
        currElement = this.getElementWithIndexI(currentIndexI, elems);

        indexOfNextElement = currentIndexI + increment;
        if (currElement.isReal) {
            // if current element is REAL
            while (indexOfNextElement != minIndex) {
                nextElement = this.getElementWithIndexI(indexOfNextElement, elems);
                // if found element is REAL
                if (nextElement.isReal) {
                    // if elements have equal values
                    if (nextElement.getValue() == currElement.getValue()) {
                        // move found element to current element's position
                        nextElement.setPosition(new Position(currentIndexI, nextElement.getPosition().j), event -> {
                            // after moving found element -> update it value and remove current element from node
                            this.numbersPane.removeChild(currElement.element);
                        });
                        nextElement.setValue(nextElement.getValue() * 2);
                        // remove current element for array of elements and call this function again for the next rect
                        elems.remove(currElement);
                        this.elements.remove(currElement);
                        this.findActionDownAndUp(currentIndexI + increment, elems, minIndex, increment);
                        return;
                    } else {
                        // if found element position doesn't equal with nearest of current element
                        if (nextElement.getPosition().i != currentIndexI + increment) {
                            // move found element to nearest rect with current element
                            nextElement.setPosition(new Position(currentIndexI + increment, nextElement.getPosition().j), true);
                        }
                        // call this function again for the next rect
                        this.findActionDownAndUp(currentIndexI + increment, elems, minIndex, increment);
                        return;
                    }
                }
                indexOfNextElement += increment;
            }
            // if nothing to move -> return
            return;
        } else {
            // if current element is FAKE
            while(indexOfNextElement != minIndex) {
                nextElement = this.getElementWithIndexI(indexOfNextElement, elems);
                if (nextElement.isReal) {
                    nextElement.setPosition(new Position(currentIndexI, nextElement.getPosition().j), true);
                    this.findActionDownAndUp(currentIndexI + increment, elems, minIndex, increment);
                    return;
                }
                indexOfNextElement += increment;
            }
            // if nothing to move -> return
            return;
        }
    }
    private void findActionLeftAndRight(int currentIndexJ, ArrayList<NumberElement> elems, int minIndex, int increment) {
        NumberElement currElement, nextElement;
        int indexOfNextElement;
        // if current index is last(function on the top element) or if we have empty array of elements -> GET OUT OF HERE
        if (currentIndexJ == minIndex || elems.size() == 0) {
            return;
        }
        // get element by current index
        currElement = this.getElementWithIndexJ(currentIndexJ, elems);

        indexOfNextElement = currentIndexJ + increment;
        if (currElement.isReal) {
            // if current element is REAL
            while (indexOfNextElement != minIndex) {
                nextElement = this.getElementWithIndexJ(indexOfNextElement, elems);
                // if found element is REAL
                if (nextElement.isReal) {
                    // if elements have equal values
                    if (nextElement.getValue() == currElement.getValue()) {
                        // move found element to current element's position
                        nextElement.setPosition(new Position(nextElement.getPosition().i, currentIndexJ), event -> {
                            // after moving found element -> update it value and remove current element from node
                            this.numbersPane.removeChild(currElement.element);
                        });
                        nextElement.setValue(nextElement.getValue() * 2);
                        // remove current element for array of elements and call this function again for the next rect
                        elems.remove(currElement);
                        this.elements.remove(currElement);
                        this.findActionLeftAndRight(currentIndexJ + increment, elems, minIndex, increment);
                        return;
                    } else {
                        // if found element position doesn't equal with nearest of current element
                        if (nextElement.getPosition().j != currentIndexJ + increment) {
                            // move found element to nearest rect with current element
                            nextElement.setPosition(new Position(nextElement.getPosition().i, currentIndexJ + increment), true);
                        }
                        // call this function again for the next rect
                        this.findActionLeftAndRight(currentIndexJ + increment, elems, minIndex, increment);
                        return;
                    }
                }
                indexOfNextElement += increment;
            }
            // if nothing to move -> return
            return;
        } else {
            // if current element is FAKE
            while(indexOfNextElement != minIndex) {
                nextElement = this.getElementWithIndexJ(indexOfNextElement, elems);
                if (nextElement.isReal) {
                    nextElement.setPosition(new Position(nextElement.getPosition().i, currentIndexJ), true);
                    this.findActionLeftAndRight(currentIndexJ + increment, elems, minIndex, increment);
                    return;
                }
                indexOfNextElement += increment;
            }
            // if nothing to move -> return
            return;
        }
    }
}
