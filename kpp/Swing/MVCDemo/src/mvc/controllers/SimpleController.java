package mvc.controllers;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import mvc.models.SimpleModel;
import mvc.views.SimpleView;

public class SimpleController {
	private SimpleModel model;
    private SimpleView view;
    private ActionListener actionListener;
    
    public SimpleController(){
        this.model = new SimpleModel(0);
        this.view = new SimpleView("-"); 
        view.setModel(model); // 1: отобразить
    }
    
    public void control(){  
        actionListener = new ActionListener() {
              public void actionPerformed(ActionEvent actionEvent) {                  
                  model.incrX(); // 3: обновить содержимое
              }
        };                
        view.getButton().addActionListener(actionListener);   
    }
    
}
