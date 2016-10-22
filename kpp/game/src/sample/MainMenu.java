package sample;

import javafx.application.Platform;
import javafx.event.EventHandler;
import javafx.scene.layout.Pane;

import java.awt.event.ActionEvent;
import java.util.ArrayList;

/**
 * Created by kosiak_man on 11.10.16.
 */
public class MainMenu {
    private DialogShield shield;
    private ArrayList<Button> buttons;
    private sample.Button newGameButton;
    private sample.Button exit;
    private sample.Button donate;
    private sample.Button addButton(String text) {
        sample.Button button = new Button(text);
        this.shield.appendChild(button);
        return button;
    }
    MainMenu(Pane parent, EventHandler<javafx.event.ActionEvent> value, boolean fillParent) {
        this(parent, value);
        if (fillParent) {
            this.shield.fillParent();
        }
    }
    MainMenu(Pane parent, EventHandler<javafx.event.ActionEvent> newGameEvent) {
        this.shield = new DialogShield(parent);
        this.donate = this.addButton("Donate");
        this.newGameButton = this.addButton("New game");
        this.exit = this.addButton("Exit");

        this.newGameButton.setOnAction(newGameEvent);
        this.donate.setOnAction(event -> {
            this.donate.setText("Donate :)");
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
