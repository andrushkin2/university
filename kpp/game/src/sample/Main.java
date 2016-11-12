package sample;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.*;
import javafx.stage.Stage;


public class Main extends Application {
    private final double width = 500;
    private final double height = 500;
    private void setDefaultConfig(Pane grid) {
        grid.setLayoutX(0);
        grid.setMinSize(this.width, this.height);
        grid.setMaxSize(this.width, this.height);
        grid.getStyleClass().add("main_container");
    }
    private void setDefaultConfig(Stage primaryStage) {
        primaryStage.setMinHeight(this.height);
        primaryStage.setMinWidth(this.width);
        primaryStage.setMaxHeight(this.height);
        primaryStage.setMaxWidth(this.width);
        primaryStage.setMaximized(false);
        primaryStage.setFullScreen(false);
    }
    private Menu menu;
    private MainMenu mainMenu;
    private GamePane table;
    private EventHandler<KeyEvent> keyPress;
    @Override
    public void start(Stage primaryStage) throws Exception{
        this.setDefaultConfig(primaryStage);
        this.keyPress = event -> {
            KeyCode code = event.getCode();
            if (code.equals(KeyCode.DOWN)) {
                this.table.moveEvent("down");
            }
            if (code.equals(KeyCode.UP)) {
                this.table.moveEvent("up");
            }
            if (code.equals(KeyCode.LEFT)) {
                this.table.moveEvent("left");
            }
            if (code.equals(KeyCode.RIGHT)) {
                this.table.moveEvent("right");
            }
        };
        Pane root = FXMLLoader.load(getClass().getResource("sample.fxml"));
        this.setDefaultConfig((root));
        Scene mainScene = new Scene(root);
        this.table = new GamePane(root);
        this.table.hide();
        mainScene.getStylesheets().add("sample/styles.css");
        this.menu = new Menu(root, true);
        this.menu.hide();
        this.mainMenu = new MainMenu(root, event -> {
            this.mainMenu.hide();
            this.table.show();
            this.table.startNewGame();
        });
        mainScene.setOnKeyReleased(this.keyPress);
        new Table(root);
        primaryStage.setTitle("2048");
        primaryStage.setScene(mainScene);
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
