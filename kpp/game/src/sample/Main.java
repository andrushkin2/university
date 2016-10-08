package sample;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ToolBar;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

public class Main extends Application {
    private final double width = 500;
    private final double height = 500;
    private void setDefaultConfig(Pane grid) {
        grid.setMinSize(this.width, this.height);
        grid.setMaxSize(this.width, this.height);
       /* grid.setPrefWidth(this.width);
        grid.setPrefHeight(this.height);
        grid.setPrefSize(this.width, this.height);*/
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
    @Override
    public void start(Stage primaryStage) throws Exception{
        this.setDefaultConfig(primaryStage);
        Pane root = FXMLLoader.load(getClass().getResource("sample.fxml"));
        this.setDefaultConfig((root));
        Scene mainScene = new Scene(root);
        mainScene.getStylesheets().add("sample/styles.css");
        this.menu = new Menu(root, true);
        this.menu.hide();
        sample.Button button = new sample.Button("Menu");
        button.setOnAction(event -> this.menu.show());
        root.getChildren().add(button);
        primaryStage.setTitle("2048");
        primaryStage.setScene(mainScene);
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
