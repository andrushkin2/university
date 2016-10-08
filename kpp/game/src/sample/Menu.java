package sample;

import javafx.application.Platform;
import javafx.scene.Parent;
import javafx.scene.layout.Pane;

import java.lang.reflect.Array;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by User on 10/8/2016.
 */
public class Menu {
    private DialogShield shield;
    private ArrayList<sample.Button> buttons;
    private sample.Button newGameButton;
    private sample.Button exit;
    private sample.Button pause;
    private sample.Button addButton(String text) {
        sample.Button button = new Button(text);
        this.shield.appendChild(button);
        return button;
    }
    Menu(Pane parent, boolean fillParent) {
        this(parent);
        if (fillParent) {
            this.shield.fillParent();
        }
    }
    Menu(Pane parent) {
        this.shield = new DialogShield(parent);
        this.pause = this.addButton("Continue");
        this.newGameButton = this.addButton("New game");
        this.exit = this.addButton("Exit");

        this.pause.setOnAction(event -> {
            this.pause.setVisible(false);
            this.pause.maxHeight(0);
        });
        this.exit.setOnAction(event -> {
            Platform.exit();
        });
    }
    public void show() {
        this.shield.show();
    }
    public void hide() {
        this.shield.hide();
    }
}
